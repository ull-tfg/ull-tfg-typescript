import { simplify } from './ull-string';

export class UllDockerImageName {

    public static readonly REGULAR_EXPRESSION: RegExp = new RegExp("^(?:(?=[^:\\/]{1,253})(?!-)[a-zA-Z0-9-]{1,63}(?<!-)(?:\\.(?!-)[a-zA-Z0-9-]{1,63}(?<!-))*(?::[0-9]{1,5})?/)?((?![._-])(?:[a-z0-9._-]*)(?<![._-])(?:/(?![._-])[a-z0-9._-]*(?<![._-]))*)(?::(?![.-])[a-zA-Z0-9_.-]{1,128})?$");
    public static readonly ERROR_NOT_DEFINED: string = "Docker image name is not defined";
    public static readonly ERROR_EMPTY: string = "Docker image name cannot be empty";
    public static readonly ERROR_WRONG_FORMAT: string = "Docker image name has the following format and components: [HOST[:PORT_NUMBER]/]PATH. " +
        "HOST it the optional registry hostname specifies where the image is located. " +
        "PORT_NUMBER is the registry port number. " +
        "PATH consists of slash-separated components. Each component may contain lowercase letters, digits and separators. " +
        "More information can be found in https://docs.docker.com/engine/reference/commandline/image_tag/#description";
    public readonly value: string;

    constructor(value: string) {
        this.validate(value);
        this.value = simplify(value);
    }

    private validate(value: string) {
        if (value == null) {
            throw new Error(UllDockerImageName.ERROR_NOT_DEFINED);
        }
        value = simplify(value);
        const length = value.length;
        if (length === 0) {
            throw new Error(UllDockerImageName.ERROR_EMPTY);
        }
        if (!UllDockerImageName.REGULAR_EXPRESSION.test(value)) {
            throw new Error(UllDockerImageName.ERROR_WRONG_FORMAT);
        }
    }

    public equals(other: any): boolean {
        if (this === other) {
            return true;
        }
        if (other === null || other === undefined) {
            return false;
        }
        if (!(other instanceof UllDockerImageName)) {
            return false;
        }
        const otherImageName: UllDockerImageName = other as UllDockerImageName;
        return this.value === otherImageName.value;
    }

    public getValue(): string {
        return this.value;
    }

    public toString(): string {
        return this.value;
    }

    public static externalValidate(value: string): boolean | string {
        try {
            new UllDockerImageName(value);
            return true;
        } catch (error: any) {
            return error.message;
        }
    }
}
