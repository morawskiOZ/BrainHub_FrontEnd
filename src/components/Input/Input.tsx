import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@material-ui/core'
import Input from '@material-ui/core/Input'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import * as React from 'react'
import { ReactElement, useState, memo } from 'react'

const useStyles = makeStyles({
  root: {
    height: 65,
  },
  label: {
    marginLeft: 6,
  },
})

interface Props {
  onSearch: (phrase: string) => void
}

export const ContactInput = memo(
  ({ onSearch }: Props): ReactElement => {
    const classes = useStyles()
    const [phrase, setPhrase] = useState('')

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setPhrase(e.target.value)
    }

    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.keyCode === 13) {
        onSearch(phrase)
      }
    }

    const submitHandler = (): void => {
      onSearch(phrase)
    }

    return (
      <FormControl fullWidth classes={{ root: classes.root }}>
        <InputLabel className={classes.label} htmlFor="search">
          Search for a name
        </InputLabel>
        <Input
          onChange={changeHandler}
          onKeyDown={keyDownHandler}
          fullWidth
          id="search"
          disableUnderline
          margin="none"
          startAdornment={
            <InputAdornment position="start">
              <IconButton onClick={submitHandler}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    )
  },
)
