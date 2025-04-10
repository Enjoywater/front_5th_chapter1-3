import { useState } from "react";
import { memo, useMemo } from "../@lib";
import { useTheme } from "../@lib/context";
import { Item } from "../types/common";
import { renderLog } from "../utils";

const generateLocaleString = (value: number, unit: string) =>
  value.toLocaleString() + unit;

const ItemList: React.FC<{
  items: Item[];
  onAddItemsClick: () => void;
}> = memo(({ items, onAddItemsClick }) => {
  renderLog("ItemList rendered");

  const [filter, setFilter] = useState("");

  const { theme } = useTheme();

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.name.toLowerCase().includes(filter.toLowerCase()) ||
          item.category.toLowerCase().includes(filter.toLowerCase()),
      ),
    [items, filter],
  );

  const totalPrice = useMemo(
    () => filteredItems.reduce((sum, item) => sum + item.price, 0),
    [filteredItems],
  );

  const averagePrice = useMemo(
    () => Math.round(totalPrice / filteredItems.length) || 0,
    [totalPrice, filteredItems],
  );

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">상품 목록</h2>

        <div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
            onClick={onAddItemsClick}
          >
            대량추가
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="상품 검색..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
      />

      <ul className="mb-4 mx-4 flex gap-3 text-sm justify-end">
        <li>검색결과: {generateLocaleString(filteredItems.length, "개")}</li>
        <li>전체가격: {generateLocaleString(totalPrice, "원")}</li>
        <li>평균가격: {generateLocaleString(averagePrice, "원")}</li>
      </ul>

      <ul className="space-y-2">
        {filteredItems.map((item, index) => (
          <li
            key={index}
            className={`p-2 rounded shadow ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
          >
            {item.name} - {item.category} -{" "}
            {generateLocaleString(item.price, "원")}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ItemList;
