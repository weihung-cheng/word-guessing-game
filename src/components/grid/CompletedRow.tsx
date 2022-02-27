import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'
// TODO-cknipe: uncomment this
//import { addToSnakeGrid } from '../../lib/snalgorithm'

type Props = {
  guess: string
}

export const CompletedRow = ({ guess }: Props) => {
  const statuses = getGuessStatuses(guess)
  // TODO-cknipe: uncomment this
  //addToSnakeGrid(statuses)

  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i]} />
      ))}
    </div>
    // guess            = "ARISE"
    // .split('')       = [A, R, I, S, E]
    // i                = index iterator that's a special thing for map()
    // statuses[i]      = CharStatus ('absent' | 'present' | 'correct')
  )
}
