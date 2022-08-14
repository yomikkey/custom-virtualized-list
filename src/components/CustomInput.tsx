import { InputGroup, Form } from "react-bootstrap";

type CustomInputProps = {
    text: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: number;
    disabled?: boolean;
}

export const CustomInput = (props: CustomInputProps) => {
    const { text, onChange, value = "", disabled } = props;
    return (
        <InputGroup className="mb-3" onChange={onChange && ((e:React.ChangeEvent<HTMLInputElement>) => onChange(e))}>
            <InputGroup.Text id="inputGroup-sizing-default">{text}</InputGroup.Text>
            <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                defaultValue={value}
                disabled={disabled}
            />
        </InputGroup>
    );
};
