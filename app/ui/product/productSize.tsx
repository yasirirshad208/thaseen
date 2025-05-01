import { useState } from "react";

interface ProductSizeProps {
  onSelectSize: (size: string) => void;
  onMeasurementsChange?: (measurements: Measurements) => void; // Optional
  onAdditionalInstructionsChange?: (instructions: string) => void; // Optional
  sizeArray:string[]
}

interface Measurements {
  shoulder: string;
  hips: string;
  bust: string;
  waist: string;
  lengthFromShoulderToFloor: string;
  sleeveLength: string;
}

const ProductSize: React.FC<ProductSizeProps> = ({
  onSelectSize,
  onMeasurementsChange,
  onAdditionalInstructionsChange,
  sizeArray
}) => {
  const predefinedSizes = sizeArray || [
    "UK4",
    "UK6",
    "UK8",
    "UK10",
    "UK12",
    "UK14",
    "UK16",
    "UK18",
    "UK20",
    "UK22",
    "UK24",
  ];

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [measurements, setMeasurements] = useState<Measurements>({
    shoulder: "",
    hips: "",
    bust: "",
    waist: "",
    lengthFromShoulderToFloor: "",
    sleeveLength: "",
  });
  const [additionalInstructions, setAdditionalInstructions] =
    useState<string>("");

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
    onSelectSize(event.target.value); // Pass selected size to parent
  };

  const handleMeasurementChange = (
    field: keyof Measurements,
    value: string
  ) => {
    const updatedMeasurements = { ...measurements, [field]: value };
    setMeasurements(updatedMeasurements);
    if (onMeasurementsChange) onMeasurementsChange(updatedMeasurements); // Pass measurements to parent if callback exists
  };

  const handleAdditionalInstructionsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAdditionalInstructions(event.target.value);
    if (onAdditionalInstructionsChange)
      onAdditionalInstructionsChange(event.target.value); // Pass instructions to parent if callback exists
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <label className="block text-lg font-medium text-gray-700">Size</label>
        <a
          href="#size-chart"
          className="text-sm text-indigo-600 hover:underline"
        >
          Size Chart
        </a>
      </div>

      {/* Predefined Sizes */}
      <select
        className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-150"
        value={selectedSize}
        onChange={handleSizeChange}
      >
        <option value="">Select a size</option>
        {predefinedSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      {/* Custom Measurements */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700">
          Optional Measurements (CM/INCH)
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {[
            { label: "Shoulder", field: "shoulder" },
            { label: "Hips", field: "hips" },
            { label: "Bust", field: "bust" },
            { label: "Waist", field: "waist" },
            {
              label: "Length from Shoulder to Floor",
              field: "lengthFromShoulderToFloor",
            },
            { label: "Sleeve Length", field: "sleeveLength" },
          ].map(({ label, field }) => (
            <div key={field}>
              <label className="block text-gray-600">{label}</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-150"
                placeholder={`Enter ${label.toLowerCase()}`}
                value={measurements[field as keyof Measurements]} // Controlled input
                onChange={(e) =>
                  handleMeasurementChange(
                    field as keyof Measurements,
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Additional Instructions */}
      <div className="mt-6">
        <label
          htmlFor="additionalInstructions"
          className="block text-lg font-medium text-gray-700"
        >
          Additional Instructions
        </label>
        <textarea
          id="additionalInstructions"
          rows={3}
          className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-150"
          placeholder="Enter any additional instructions here"
          value={additionalInstructions} // Controlled input
          onChange={handleAdditionalInstructionsChange}
        />
      </div>
    </div>
  );
};

export default ProductSize;
