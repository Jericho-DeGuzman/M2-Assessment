import { Questions } from "@/types/Questions";

export function shuffleQuestions (questions: Array<Questions>): Promise<Questions[]> {
    return new Promise ((resolve) => {
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        resolve(questions);
    })
}