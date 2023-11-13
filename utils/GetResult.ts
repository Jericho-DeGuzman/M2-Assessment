const result = [`Self-Management You manage yourself well; You take responsibility for your own behavior and well-being.`,
    `Empathy You are emphatic. You see yourself in someone else’s situation before doing decisions. You tend to listen to other’s voices.`,
    `Self-Awareness You are conscious of your own character, feelings, motives, and desires.The process can be painful but it leads to greater self-awareness.`]


interface Result {
    a: number;
    b: number;
    c: number;
    result: string;
}

async function getResult(answers: { [key: string]: string }): Promise<Result> {
    // count how many times each choice was answered.
    let a: number = 0;
    let b: number = 0;
    let c: number = 0;
    let _result: string = '';

    for (let answer in answers) {
        const choice = answers[answer];

        switch (choice) {
            case 'a': a++;
                break;
            case 'b': b++;
                break;
            case 'c': c++;
                break
        }
    }

    // check the result.
    if (a > b && a > c) {
        _result = result[1];
    } else if (b > a && b > c) {
        _result = result[2];
    } else if (c > a && b > c) {
        _result = result[0];
    } else {
        _result = result[2];
    }

    return { 'a': a, 'b': b,'c': c, 'result': _result };
}

export default getResult;