import test from "node:test";
import assert from "node:assert/strict";

import {orderTitleEntriesBySubcategoryRoundRobin} from "../title-files.mjs";

function entry(parentCategoryNumber, childCategoryNumber, title) {
  return {parentCategoryNumber, childCategoryNumber, title};
}

test("세부카테고리마다 한 개씩 순환한다", () => {
  const input = [
    entry(1, 1, "1-1 첫째"),
    entry(1, 1, "1-1 둘째"),
    entry(1, 2, "1-2 첫째"),
    entry(1, 2, "1-2 둘째"),
    entry(2, 1, "2-1 첫째"),
    entry(2, 1, "2-1 둘째"),
  ];

  assert.deepEqual(
    orderTitleEntriesBySubcategoryRoundRobin(input).map((item) => item.title),
    ["1-1 첫째", "1-2 첫째", "2-1 첫째", "1-1 둘째", "1-2 둘째", "2-1 둘째"],
  );
});

test("제목 수가 다른 세부카테고리도 빠뜨리지 않는다", () => {
  const input = [
    entry(1, 1, "A1"),
    entry(1, 1, "A2"),
    entry(1, 1, "A3"),
    entry(1, 2, "B1"),
  ];

  assert.deepEqual(
    orderTitleEntriesBySubcategoryRoundRobin(input).map((item) => item.title),
    ["A1", "B1", "A2", "A3"],
  );
});

test("카테고리 정보가 없는 제목은 기존 순서를 유지해 마지막에 둔다", () => {
  const input = [
    entry(0, 0, "일반 1"),
    entry(1, 1, "A1"),
    entry(1, 2, "B1"),
    entry(0, 0, "일반 2"),
  ];

  assert.deepEqual(
    orderTitleEntriesBySubcategoryRoundRobin(input).map((item) => item.title),
    ["A1", "B1", "일반 1", "일반 2"],
  );
});
