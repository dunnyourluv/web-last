import { useSelector } from "react-redux";
import Select from "../Select/Select";
import { RootState } from "../../../app/store";

interface SelectTypeProps {
    onChange?: (value: string) => void;
    option?: string;
}

const SelectType = (props: SelectTypeProps) => {
    const options = useSelector((state: RootState) => state.produce.types);

    return (
        <Select
            option={props.option}
            onChange={props.onChange}
            border="bottom"
            options={options || []}
        />
    );
};

export default SelectType;
