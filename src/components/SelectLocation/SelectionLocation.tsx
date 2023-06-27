import { useSelector } from "react-redux";
import Select from "../common/Select/Select";
import { RootState } from "../../app/store";

const SelectLocation: React.FC<{
    onChange: (value: string) => void;
}> = ({ onChange }) => {
    const cards = useSelector((state: RootState) => state.produce.cards);

    const locations: {
        value: string;
        label: string;
    }[] = [];

    for (const card of cards) {
        if (locations.findIndex((v) => v.value == card.location) === -1)
            locations.push({
                value: card.location,
                label: card.location,
            });
    }

    return (
        <Select
            options={[
                {
                    value: "none",
                    label: "Địa điểm",
                },
                ...Array.from(locations),
            ]}
            border="bottom"
            onChange={onChange}
        />
    );
};

export default SelectLocation;
