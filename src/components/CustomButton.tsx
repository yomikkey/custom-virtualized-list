import Button from 'react-bootstrap/Button';

type CustomButtonProps = {
    text: string,
    variant: string,
    onClick: () => void,
}

export const CustomButton = (props:CustomButtonProps) => {
  const { text, variant, onClick } = props;
  return (
    <>
      <Button variant={variant} onClick={onClick}>
        {text}
      </Button>
    </>
  );
};
