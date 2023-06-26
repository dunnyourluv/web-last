class Validate {
    static isEmail(email: string): boolean {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    static isPassword(password: string): boolean {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return password.length >= 8;
    }

    static isName(name: string): boolean {
        const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        return regex.test(name);
    }

    static isPhone(phone: string): boolean {
        const regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        return regex.test(phone);
    }

    static isTitle(title: string): boolean {
        const regex = /^.{1,100}$/;
        return regex.test(title);
    }
}

export default Validate;
