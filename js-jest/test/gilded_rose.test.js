const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  describe("default item behavior", function () {
    it("should have a name value", function () {
      const gildedRose = new Shop([new Item("foo", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("foo");
    });

    it("should have a sellIn value that decreases at the end of the day", function () {
      const gildedRose = new Shop([new Item("foo", 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
    });

    it("should have a quality value that decreases at the end of the day", function () {
      const gildedRose = new Shop([new Item("foo", 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(19);
    });

    it("should have a quality value that decreases twice as fast after sellIn date has passed", function () {
      const gildedRose = new Shop([new Item("foo", 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(18);
    });

    it("should not have a quality value that is negative", function () {
      const gildedRose = new Shop([new Item("foo", 10, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });

  describe("special item behavior", function () {
    describe("Conjured items", function () {
      it("should have a quality value that decreases twice as fast", function () {
        const gildedRose = new Shop([
          new Item("conjured plate", 5, 10),
          new Item("Conjured cup", 10, 20),
          new Item("CONJURED HAT", 15, 30),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(4);
        expect(items[0].quality).toBe(8);

        expect(items[1].quality).toBe(18);
        expect(items[2].quality).toBe(28);
      });

      it("should degrade in quality twice as fast after sellIn date has passed", function () {
        const gildedRose = new Shop([new Item("conjured plate", 0, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(6);
      });
      it("should not have a quality value that is negative", function () {
        const gildedRose = new Shop([new Item("conjured plate", 10, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(0);
      });
    });

    describe("Aged Brie", function () {
      it("should increase in quality as it gets older", function () {
        const gildedRose = new Shop([new Item("Aged Brie", 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(21);
      });

      it("should not have a quality value that is greater than 50", function () {
        const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(50);
      });
    });

    describe("Sulfuras, Hand of Ragnaros", function () {
      it("should not decrease in quality or sellIn value", function () {
        const gildedRose = new Shop([
          new Item("Sulfuras, Hand of Ragnaros", 10, 20),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(20);
        expect(items[0].sellIn).toBe(10);
      });
    });

    describe("Backstage passes to a TAFKAL80ETC concert", function () {
      it("should increase in quality by 1 when sellIn day is greater than 10 days ", function () {
        const gildedRose = new Shop([
          new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(21);
      });

      it("should increase in quality by 1 when sellIn day is greater than 10 days, but never more than 50 ", function () {
        const gildedRose = new Shop([
          new Item("Backstage passes to a TAFKAL80ETC concert", 11, 50),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(50);
      });

      it("should increase in quality by 2 when sellIn day is between 10 - 6 days ", function () {
        const gildedRose = new Shop([
          new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(22);

        const gildedRose2 = new Shop([
          new Item("Backstage passes to a TAFKAL80ETC concert", 6, 20),
        ]);
        const items2 = gildedRose2.updateQuality();
        expect(items2[0].quality).toBe(22);
      });

      it("should increase in quality by 2 when sellIn day is between 10 - 6 days, but never more than 50 ", function () {
        const gildedRose = new Shop([
          new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(50);
      });

      it("should increase in quality by 3 when sellIn day is between 5 - 1 days ", function () {
        const gildedRose = new Shop([
          new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(23);

        const gildedRose2 = new Shop([
          new Item("Backstage passes to a TAFKAL80ETC concert", 1, 20),
        ]);
        const items2 = gildedRose2.updateQuality();
        expect(items2[0].quality).toBe(23);
      });

      it("should increase in quality by 3 when sellIn day is between 5 - 1 days, but never more than 50", function () {
        const gildedRose = new Shop([
          new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(50);
      });

      it("should drop quality to 0 when sellIn has passed)", function () {
        const gildedRose = new Shop([
          new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(0);
      });
    });
  });
});
