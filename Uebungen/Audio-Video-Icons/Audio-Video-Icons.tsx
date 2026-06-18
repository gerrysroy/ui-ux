import { Button, Slider } from "@fluentui/react-components";
import { Circle24Regular, Star24Regular } from "@fluentui/react-icons";

export default function AudioVideoIcons() {
  return (
    <>
      <Button icon={<Star24Regular />} />
      <Button icon={<Circle24Regular />} />
      <Slider />
      <Slider />
    </>
  );
}
