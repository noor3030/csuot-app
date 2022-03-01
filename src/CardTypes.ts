declare module types {

    export interface Department {
        id: string;
        name: string;
    }

    export interface Branch {
        id: string;
        name: string;
        department: Department;
    }

    export interface Stage {
        name: string;
        shift: string;
        level: number;
        branch_id: string;
        id: string;
        branch: Branch;
    }

    export interface Teacher {
        id: string;
        name: string;
        color: string;
    }

    export interface Subject {
        name: string;
        color: string;
        id: string;
    }

    export interface Room {
        name: string;
        color: string;
        building_id: string;
        floor_id: string;
        type: string;
        id: string;
    }

    export interface Lesson {
        subject_id: string;
        teacher_id: string;
        room_id: string;
        id: string;
        stages: Stage[];
        teacher: Teacher;
        subject: Subject;
        room: Room;
    }

    export interface Card {
        period_id: string;
        day_id: string;
        lesson_id: string;
        lesson: Lesson;
    }

    export interface Day {
        name: string;
        id: string;
    }

    export interface Period {
        name: string;
        start_time: string;
        end_time: string;
        id: string;
    }

    export interface Schedule {

        cards: Card[];
        days: Day[];
        periods: Period[];
        stage : Stage
    }


}
export default types