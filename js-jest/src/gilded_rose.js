class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const ItemHandler = {
  "Aged Brie": (item) => {
    item.sellIn -= 1;
    if (item.quality < 50) {
      item.quality += 1;
    }
  },
  "Sulfuras, Hand of Ragnaros": (item) => {
    return;
  },
  "Backstage passes to a TAFKAL80ETC concert": (item) => {
    if (item.quality != 50) {
      if (item.sellIn > 10) {
        item.quality += 1;
      } else if (item.sellIn > 5) {
        item.quality += 2;
      } else if (item.sellIn > 0) {
        item.quality += 3;
      } else {
        item.quality = 0;
      }
    }

    item.sellIn -= 1;
  },
  conjured: (item) => {
    if (item.sellIn > 0) {
      item.quality -= 2;
    } else {
      item.quality -= 4;
    }
    if (item.quality < 0) {
      item.quality = 0;
    }
    item.sellIn -= 1;
  },
  default: (item) => {
    if (item.sellIn > 0) {
      item.quality -= 1;
    } else {
      item.quality -= 2;
    }
    if (item.quality < 0) {
      item.quality = 0;
    }
    item.sellIn -= 1;
  },
};

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const handlerName = getHandlerName(item);
      ItemHandler[handlerName](item);
    }

    return this.items;
  }
}

function getHandlerName(item) {
  if (item.name.toLowerCase().includes("conjured")) {
    return "conjured";
  }
  // Object.hasOwn is more performant than Object.keys(ItemHandler).includes
  // because it doesn't create an array of keys.
  if (Object.hasOwn(ItemHandler, item.name)) {
    return item.name;
  }
  return "default";
}

module.exports = {
  Item,
  Shop,
};
