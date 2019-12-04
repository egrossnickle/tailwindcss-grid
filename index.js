const _ = require('lodash')

module.exports = function({
  e,
  addUtilities,
  theme
}) {
  const grids = theme('grid.grids', _.range(1, 13))
  const gaps = theme('grid.gaps', {})
  const autoMinWidths = theme('grid.autoMinWidths', {})
  const variants = theme('grid.variants', ['responsive'])
  const columnSpanPosition = theme('grid.columnSpanPosition', 'start')
  const rowSpanPosition = theme('grid.rowSpanPosition', 'start')

  addUtilities(
    [{
        '.grid': {
          display: 'grid',
        },
      },
      {
        '.grid-dense': {
          gridAutoFlow: 'dense',
        },
      },
      ..._.map(gaps, (size, name) => {
        const gridGap = name.endsWith('-y') ?
          'gridRowGap' :
          name.endsWith('-x') ?
          'gridColumnGap' :
          'gridGap'

        return {
          [`.${e(`grid-gap-${name}`)}`]: {
            [gridGap]: size,
          },
        }
      }),
      ...grids.map(columns => ({
        [`.grid-columns-${columns}`]: {
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        },
      })),
      ..._.map(autoMinWidths, (size, name) => ({
        [`.${e(`grid-automin-${name}`)}`]: {
          gridTemplateColumns: `repeat(auto-fit, minmax(${size}, 1fr))`,
        },
      })),
      ..._.range(1, _.max(grids) + 1).map(span => ({
        [`.col-span-${span}`]: {
          [`grid-column-${columnSpanPosition}`]: `span ${span}`,
        },
      })),
      ..._.range(1, _.max(grids) + 2).map(line => ({
        [`.col-start-${line}`]: {
          gridColumnStart: `${line}`,
        },
        [`.col-end-${line}`]: {
          gridColumnEnd: `${line}`,
        },
      })),
      ..._.range(1, _.max(grids) + 1).map(span => ({
        [`.row-span-${span}`]: {
          [`grid-row-${rowSpanPosition}`]: `span ${span}`,
        },
      })),
      ..._.range(1, _.max(grids) + 2).map(line => ({
        [`.row-start-${line}`]: {
          gridRowStart: `${line}`,
        },
        [`.row-end-${line}`]: {
          gridRowEnd: `${line}`,
        },
      })),
    ],
    variants,
  )
}
