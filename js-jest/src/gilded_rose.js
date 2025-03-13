class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.name == "Aged Brie") {
        item.sellIn -= 1;
        if (item.quality < 50) {
          item.quality += 1;
        }
      } else if (item.name == "Sulfuras, Hand of Ragnaros") {
        continue;
      } else if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
        if (item.quality != 50) {
          if (item.sellIn <= 0) {
            item.quality = 0;
          } else if (item.sellIn <= 5) {
            item.quality += 3;
          } else if (item.sellIn <= 10) {
            item.quality += 2;
          } else {
            item.quality += 1;
          }
        }

        item.sellIn -= 1;
      } else {
        if (item.sellIn > 0) {
          item.quality -= 1;
        } else {
          item.quality -= 2;
        }
        item.sellIn -= 1;

        if (item.quality < 0) {
          item.quality = 0;
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
