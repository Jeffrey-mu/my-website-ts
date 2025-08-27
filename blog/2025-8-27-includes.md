---
slug: JavaScript 数组 includes 为什么设计第二个参数 有什么使用场景吗？
title: JavaScript 数组 includes 为什么设计第二个参数 有什么使用场景吗？
authors: Jeffrey
tags: [JavaScript, includes]
---

`Array.prototype.includes()` 方法的第二个参数 `fromIndex` 并不是随意设计的，它有其明确的目的和非常实用的应用场景。

### 第二个参数的作用

**`fromIndex`** 指定了开始搜索的索引位置。搜索会从这个索引开始（包括该索引），并向数组末尾进行。

- **语法**： `arr.includes(valueToFind, fromIndex)`
- **默认值**： 如果省略该参数或传入 `undefined`，则默认为 `0`，即从头开始搜索。
- **负值处理**： 如果传入负值，则将其作为 `数组长度 + fromIndex` 来计算。例如，数组长度为 `5`，`fromIndex` 为 `-2`，则实际开始搜索的位置是 `5 + (-2) = 3`。

---

### 主要设计目的和使用场景

这个参数的设计核心是为了 **优化性能和提供更精确的查找控制**。以下是几个典型的使用场景：

#### 1. 性能优化：避免不必要的搜索

这是最重要的场景。当你**已经知道目标元素不可能出现在数组的前半部分**时，使用 `fromIndex` 可以跳过已经检查过的区域，大幅提高搜索效率，尤其是在处理大型数组时。

**示例：分页或分批加载数据**
假设你从服务器分批加载了 100 条数据，已经检查过前 50 条没有你要找的值。在加载第 51-100 条后，你只需要从第 51 个位置开始搜索即可。

```javascript
const hugeArray = [...]; // 一个很大的数组
const alreadySearchedIndex = 50;

// 如果前50个已经确定没有，就从第51个开始找
const isFound = hugeArray.includes('target', alreadySearchedIndex);
```

#### 2. 在数组的特定区间内查找

你需要判断某个值是否出现在数组的**某一段特定范围**内，而不是整个数组。

**示例：游戏状态判断**
一个数组代表玩家最近 10 次的得分，你想知道玩家在**最近 5 次**（即数组的后 5 位）游戏中是否有过满分。

```javascript
const recentScores = [85, 90, 100, 95, 100, 88, 92, 100, 96, 98]
const lastFiveGamesIndex = recentScores.length - 5 // 从第5个位置开始（索引5是第6个元素）

// 检查后5次游戏中是否包含100分
const hadPerfectScoreRecently = recentScores.includes(100, lastFiveGamesIndex)
console.log(hadPerfectScoreRecently) // true （因为最后5个里有100分）
```

#### 3. 实现“查找下一个”功能

你可以记录上一次找到元素的位置，然后从下一个位置开始继续查找，从而实现查找所有匹配项或查找下一个匹配项的功能。

**示例：查找所有匹配的索引**

```javascript
const array = ['a', 'b', 'c', 'a', 'b', 'c']
const target = 'b'
const foundIndices = []
let currentIndex = 0

// 循环查找，直到找不到为止
while (currentIndex < array.length) {
  const indexOfFound = array.indexOf(target, currentIndex)
  if (indexOfFound === -1) break

  foundIndices.push(indexOfFound)
  currentIndex = indexOfFound + 1 // 从找到的位置的下一个开始继续找
}

console.log(foundIndices) // [1, 4]
```

虽然 `includes` 在这里返回布尔值，但它的兄弟方法 `indexOf`（也接受 `fromIndex` 参数）在这个场景中更常用。它们的设计理念是一致的。

#### 4. 处理循环或动态变化的数组

当数组的内容在不断变化，并且你关心的是**新添加的元素**中是否包含某个值时，你可以记录之前的数组长度，然后从那个位置开始搜索新元素。

```javascript
let logEntries = ['event1', 'event2', 'event3']
const lastCheckedLength = logEntries.length

// ... 一段时间后，数组可能增加了新条目
logEntries.push('error: something went wrong', 'event4')

// 只检查新增的条目里是否有错误，而不是扫描整个历史记录
const hasNewError = logEntries.includes(
  'error: something went wrong',
  lastCheckedLength
)
console.log(hasNewError) // true
```

### 总结

| 场景             | 描述                            | 好处                               |
| :--------------- | :------------------------------ | :--------------------------------- |
| **性能优化**     | 跳过已知无需搜索的数组前半部分  | 在处理大型数组时显著提升效率       |
| **区间查找**     | 只在数组的某个特定片段中查找    | 提供更精确的查询逻辑               |
| **查找下一个**   | 与 `indexOf` 结合，实现遍历查找 | 可以找到所有匹配项而不仅仅是第一个 |
| **处理动态数组** | 只检查新增的数据片段            | 避免重复扫描历史数据，提升性能     |

因此，`includes` 方法的第二个参数 `fromIndex` 绝不是一个冗余的设计，而是一个为了**更精细地控制查找行为、提升代码性能和表达能力**而存在的强大特性。它与字符串方法 `includes` 和数组方法 `indexOf` 的类似参数保持了一致性，符合程序员的使用直觉。
