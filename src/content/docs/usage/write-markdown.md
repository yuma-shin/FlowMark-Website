---
title: How to Write Markdown
description: Notyra uses Markdown syntax for writing.
---

Notyra uses Markdown syntax for writing.  
You can also use GitHub Alerts.

## Headings

You can create headings by adding `#` at the beginning of a line.  
The number of `#` symbols changes the heading size.

```md
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

## Line Breaks

You can insert a line break by adding two half-width spaces `  ` before the break.

```md
hoge
fuga(two spaces)
foo
```

hoge
fuga  
foo

## Blockquotes

You can create blockquotes by adding `>` at the beginning of a line.

```md
> Quote
> Quote
>
> > Nested quote
```

> Quote  
> Quote
>
> > Nested quote

## Code Blocks

You can display a code block by wrapping text with three backticks.

```python
print("Hello, world!")
```

You can also enable syntax highlighting by adding a language name after the opening backticks.

```python
print("Hello, world!")
```

## Lists

### Bullet Lists

You can create bullet lists by starting lines with a hyphen `-`, plus `+`, or asterisk `*`.

```md
- List 1
  - List 1_1
    - List 1_1_1
    - List 1_1_2
  - List 1_2
- List 2
- List 3
```

- List 1
  - List 1_1
    - List 1_1_1
    - List 1_1_2
  - List 1_2
- List 2
- List 3

### Numbered Lists

You can create numbered lists by starting lines with `number.`.

```md
1. Numbered List 1
   1. Numbered List 1-1
   1. Numbered List 1-2
1. Numbered List 2
1. Numbered List 3
```

1. Numbered List 1
   1. Numbered List 1-1
   1. Numbered List 1-2
1. Numbered List 2
1. Numbered List 3

## Tables

You can create tables using `-` and `|`.

```md
| TH1 | TH2 |
| --- | --- |
| TD1 | TD3 |
| TD2 | TD4 |
```

| TH1 | TH2 |
| --- | --- |
| TD1 | TD3 |
| TD2 | TD4 |

```md
| Left Align | Center Align | Right Align |
| :--------- | :----------: | ----------: |
| 1          |      2       |           3 |
| 4          |      5       |           6 |
```

| Left Align | Center Align | Right Align |
| :--------- | :----------: | ----------: |
| 1          |      2       |           3 |
| 4          |      5       |           6 |

## GitHub Alerts

You can use GitHub Alerts by starting with `>` and writing `[!XXX]`.

```md
> [!NOTE] This is a NOTE
> NOTE

> [!TIP]
> TIPS

> [!IMPORTANT]
> IMPORTANT

> [!WARNING]
> WARNING

> [!CAUTION]
> CAUTION
```

> [!NOTE] This is a NOTE
> NOTE

> [!TIP]
> TIPS

> [!IMPORTANT]
> IMPORTANT

> [!WARNING]
> WARNING

> [!CAUTION]
> CAUTION

## Useful Feature

When you drag to select text, a toolbar appears at the top.  
You can add text effects with one click by selecting the desired style from the toolbar.

![toolbar](@/assets/tool-bar.png)
