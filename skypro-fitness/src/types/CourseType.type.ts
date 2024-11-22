export type CourseType = {
    _id: string;
    description: string;
    difficulty: number;
    directions: Array<string>;
    duration: string;
    fitting: Array<string>;
    nameEN: string;
    nameRU: string;
    order: number;
    time: string;
    workouts: Array<string>;
};