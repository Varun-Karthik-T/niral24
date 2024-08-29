import { Button } from "@/components/ui/button"

export default function App() {
  const [selectedTab, setSelectedTab] = useState("text");
  const [fileFormat, setFileFormat] = useState("pdf");

  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
