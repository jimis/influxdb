// Libraries
import React, {FC} from 'react'
import {capitalize} from 'lodash'

// Components
import {
  Dropdown,
  ComponentStatus,
  DropdownMenuTheme,
} from '@influxdata/clockface'

// Types
import {ColorLabel} from 'src/types/colors'

interface PassedProps {
  selected: ColorLabel
  colors: ColorLabel[]
  onChoose: (colors: ColorLabel) => void
}

interface DefaultProps {
  disabled?: boolean
  stretchToFit?: boolean
  widthPixels?: number
}

type Props = PassedProps & DefaultProps

const ColorDropdown: FC<Props> = props => {
  const {
    selected,
    colors,
    onChoose,
    disabled,
    stretchToFit,
    widthPixels,
  } = props

  const status = disabled ? ComponentStatus.Disabled : ComponentStatus.Default
  const style = stretchToFit ? null : {width: `${widthPixels}px`}

  return (
    <Dropdown
      style={style}
      button={(active, onClick) => (
        <Dropdown.Button active={active} onClick={onClick} status={status}>
          <div className="color-dropdown--item">
            <div
              className="color-dropdown--swatch"
              style={{backgroundColor: selected.hex}}
            />
            <div className="color-dropdown--name">
              {capitalize(selected.name)}
            </div>
          </div>
        </Dropdown.Button>
      )}
      menu={onCollapse => (
        <Dropdown.Menu onCollapse={onCollapse} theme={DropdownMenuTheme.Onyx}>
          {colors.map(color => (
            <Dropdown.Item
              id={color.name}
              key={color.name}
              value={color}
              selected={color.name === selected.name}
              onClick={onChoose}
            >
              <div className="color-dropdown--item">
                <div
                  className="color-dropdown--swatch"
                  style={{backgroundColor: color.hex}}
                />
                <div className="color-dropdown--name">
                  {capitalize(color.name)}
                </div>
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )}
    />
  )
}

ColorDropdown.defaultProps = {
  stretchToFit: false,
  disabled: false,
  widthPixels: 100,
}

export default ColorDropdown
