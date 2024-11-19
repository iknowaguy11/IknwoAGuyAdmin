import { Tabs } from "flowbite-react";
import { HiAdjustments } from "react-icons/hi";
import TempAreas from "./TempAreas";
import TempServices from "./TempServices";

const SerachEngine = () => {
    return (
        <Tabs aria-label="Tabs with underline" variant="underline">
            <Tabs.Item active title="Sevice(s)" icon={HiAdjustments}>
                {
                    <TempServices/>
                }
            </Tabs.Item>
            <Tabs.Item title="Address(Areas)" icon={HiAdjustments}>

                {
                    <TempAreas />
                }
            </Tabs.Item>

        </Tabs>
    );
}

export default SerachEngine;