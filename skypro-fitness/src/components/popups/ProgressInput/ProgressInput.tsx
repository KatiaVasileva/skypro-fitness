import { ExerciseType } from "../../../types/WorkoutType.type";

type ProgressInputType = {
  exercise: ExerciseType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function ProgressInput({ exercise, onChange }: ProgressInputType) {
  return (
    <div>
      <p>{`Сколько раз вы сделали ${exercise.name.toLowerCase()}?`}</p>
      <input
        className="w-[280px] h-[52px] border-2 border-inputBorder rounded-[8px] pl-4"
        onChange={onChange}
        type="number"
        min="0"
        step="1"
        placeholder="0"
      />
    </div>
  );
}

export default ProgressInput;
