export class PasswordGenerator {
    getRandomNumbers(length) {
        let array = new Uint8Array(length);
        let res = new Float32Array(length);
        window.crypto.getRandomValues(array);
        for (let i = 0; i < array.length; i++) {
            if (array[i] % 0xff === 0) {
                array[i] = 0xff;
            }
            res[i] = array[i] / 0xff;
        }
        return res;
    }

    getPassword(config) {
    const characters = this.genChars(config);
    if (characters.length === 0 || characters === '-') {
        throw new Error('Keine Zeichen zum Generieren des Passworts vorhanden');
    }
    let charactersLength = characters.length;
    let randomness = this.getRandomNumbers(config['length']);
    let result = [];
    for (let i = 0; i < config['length']; i++) {
        let char = characters.charAt(
            Math.floor(randomness[i] * charactersLength)
        );
        result.push(char);
    }
    let res = result.join('');
    console.log(res);
    return res;
}


    genChars(config) {
        let chars = '';
        if (
                !config['numbers'] &&
                !config['letters'] &&
                !config['specialCharacters'] &&
                !config['localSpecialCharacters']
        ) {
            return '-'
        }
        if (config['numbers']) {
            chars = chars + '0123456789';
        }
        if (config['letters']) {
            chars = chars + 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if (config['specialCharacters']) {
            chars = chars + '!@#$%^&*()_+[]{}|;:,.<>?';
        }
        if (config['localSpecialCharacters']) {
            chars = chars + '¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ';
        }
        return chars;
        }
}

