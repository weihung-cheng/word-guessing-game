import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Make the longest snake.
        <br></br>
        Heads are letters in correct spots.<br></br>
        Middle segments are letters in incorrect spots.<br></br>
        Guesses cannot be repeated.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="W" status="correct" />
        <Cell value="A" />
        <Cell value="L" status="present" />
        <Cell value="T" />
        <Cell value="Z" status="absent" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter W is in the word and in the correct spot.
        The letter L is in the word but in the wrong spot. <br></br>
        The letter Z is not in the word in any spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="S" status="correct" />
        <Cell value="N" status="present" />
        <Cell value="A" status="present" />
        <Cell value="K" status="present" />
        <Cell value="E" status="absent" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        This snake is 4 snake units long.
      </p>

      <div className="flex justify-center mt-4">
        <Cell value="S" status="present" />
        <Cell value="P" status="present" />
        <Cell value="E" status="present" />
        <Cell value="A" status="present" />
        <Cell value="R" status="present" />
      </div>
      <div className="flex justify-center mb-1 mt-1">
        <Cell value="R" status="present" />
        <Cell value="E" status="correct" />
        <Cell value="A" status="correct" />
        <Cell value="P" status="present" />
        <Cell value="S" status="correct" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The longest snake here is 8 snake units long.
      </p>

      <div className="flex justify-center mt-4">
        <Cell value="S" status="snake" />
        <Cell value="P" status="snake" />
        <Cell value="E" status="snake" />
        <Cell value="A" status="snake" />
        <Cell value="R" status="snake" />
      </div>
      <div className="flex justify-center mb-1 mt-1">
        <Cell value="R" status="snake" />
        <Cell value="E" status="snake" />
        <Cell value="A" status="correct" />
        <Cell value="P" status="snake" />
        <Cell value="S" status="correct" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        At the end of the game, your longest snake is displayed in a different color.
      </p>
    </BaseModal>
  )
}
