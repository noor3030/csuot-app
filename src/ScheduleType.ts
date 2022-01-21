declare module types {

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

    export interface Card {
        period_id: string;
        day_id: string;
        lesson_id: string;
        id: string;
        lesson: Lesson;
    }

    export interface IdObject {
        id: string;
    }

    export interface Lesson {
        subject_id: string;
        teacher_id: string;
        id: string;
        stages: any[];
    }

    export interface Building {
        lng: number;
        lat: number;
        name: string;
        color: string;
        id: string;
    }

    export interface Floor {
        id: string;
    }

    export interface Classroom {
        name: string;
        color: string;
        building_id: string;
        floor_id: string;
        type: string;
        id: string;
    }

    export interface Subject {
        name: string;
        color: string;
        id: string;
    }

    export interface Teacher {
        name: string;
        color: string;
        en_name: string;
        email: string;
        uot_url: string;
        image: string;
        is_active: boolean;
        gender: string;
        asc_job_title: string;
        asc_name: string;
        scrape_from: string;
        role_id: string;
        id: string;
    }

    export interface Branch {
        id: string;
        name: string;
    }

    export interface Stage {
        name: string;
        shift: string;
        level: number;
        branch_id: string;
        id: string;
        branch: Branch;
    }

    export interface Schedule {
        days: Day[];
        periods: Period[];
        cards: Card[];
        lessons: Lesson[];
        buildings: Building[];
        floors: Floor[];
        classrooms: Classroom[];
        subjects: Subject[];
        teachers: Teacher[];
        stages: Stage[];
    }

}
export default types;