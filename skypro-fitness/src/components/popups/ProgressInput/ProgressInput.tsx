import { ExerciseType } from "../../../types/WorkoutType.type";

type ProgressInputType = {
  exercise: ExerciseType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
};

function ProgressInput({ exercise, onChange, value }: ProgressInputType) {
  return (
    <div>
      <p>{`Сколько раз вы сделали ${exercise.name.toLowerCase()}?`}</p>
      <input
        className="w-[320px] h-[52px] border-2 border-inputBorder rounded-[8px] pl-4"
        onChange={onChange}
        type="number"
        min="0"
        step="1"
        placeholder="0"
        defaultValue={value}
      />
    </div>
  );
}

export default ProgressInput;
