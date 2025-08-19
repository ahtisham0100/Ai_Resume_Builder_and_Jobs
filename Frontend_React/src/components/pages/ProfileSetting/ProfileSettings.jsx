import { useState } from "react";
import BasicInfo from "./BasicInfo";
import Contact from "./Contact";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import { Badge, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
const steps = [
  { id: 1, name: "Basic Info", component: BasicInfo },
  { id: 2, name: "Skills", component: Skills },
  { id: 3, name: "Experience", component: Experience },
  { id: 4, name: "Education", component: Education },
  { id: 5, name: "Contact", component: Contact },
];

export default function ProfileSettings() {
  const [currentStep, setCurrentStep] = useState(1);

  const StepComponent = steps.find(step => step.id === currentStep)?.component;

  return (
    <div className="max-w-4xl mx-auto p-6">

    {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-700 dark:text-slate-300 mb-2">
            Complete Your Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-500 text-lg">
            Help us discover your professional story for personalized experiences
          </p>
          <div className="mt-4">
              Step {currentStep} of {steps.length}
          </div>
        </div>
      {/* Timeline */}
      <div className="flex justify-between mb-8 relative">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex-1 flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2
              ${step.id <= currentStep ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-400"}`}
            >
              {step.id < currentStep ? <CheckCircle className="w-5 h-5" /> : step.id}
            </div>
            <span className="mt-2 text-sm text-center">{step.name}</span>

            {/* Connector line */}
            {idx < steps.length - 1 && (
              <div
                className={`absolute top-4 left-1/2 w-full h-0.5 -translate-x-1/2
                ${step.id < currentStep ? "bg-blue-600" : "bg-gray-300"}`}
                style={{ zIndex: -1 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Current Step Component */}
      <div className="mb-6">
        {StepComponent && <StepComponent />}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          className="px-4 py-2 rounded "
          disabled={currentStep === 1}
          onClick={() => setCurrentStep(prev => prev - 1)}
        >
          Previous
        </Button>
        <Button
          className="px-4 py-2  rounded hover:bg-blue-700"
          disabled={currentStep === steps.length}
          onClick={() => setCurrentStep(prev => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
