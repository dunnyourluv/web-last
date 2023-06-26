import Select from "../Select/Select";

interface SelectTypeProps {
    onChange?: (value: string) => void;
    option?: string;
}

const SelectType = (props: SelectTypeProps) => {
    return (
        <Select
            option={props.option}
            onChange={props.onChange}
            border="bottom"
            options={[
                {
                    label: "Loại?",
                    value: "none",
                },
                {
                    label: "Ví/Bóp",
                    value: "VB",
                },
                {
                    label: "Giấy Tờ",
                    value: "GT",
                },
                {
                    label: "Chứng minh nhân dân",
                    value: "CMND",
                },
                {
                    label: "Thẻ sinh viên",
                    value: "TSV",
                },
            ]}
        />
    );
};

export default SelectType;
