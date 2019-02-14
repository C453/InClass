export class Question {
    id: number;
    user_id: number;
    question: string;
    yeah_count: number;
    yeahs: string[];
    course_id: number;
    answered: boolean;
    created_at: string;
    updated_at: string;
}