import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StepIndicator from "@/components/discovery/StepIndicator";
import { useQuery } from "@tanstack/react-query";
import { fetchBusinessTypes, fetchLocationsByState } from "@/lib/data";
import { Loader2 } from "lucide-react";
import type { BusinessType, Location } from "@shared/schema";

const Discovery = () => {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [businessTypeId, setBusinessTypeId] = useState<string>("");
  const [stateCode, setStateCode] = useState<string>("");
  const [locationId, setLocationId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch business types
  const {
    data: businessTypes,
    isLoading: isLoadingBusinessTypes,
    error: businessTypesError,
  } = useQuery<BusinessType[]>({
    queryKey: ["/api/business-types"],
    staleTime: Infinity,
  });

  // Fetch locations when state is selected
  const {
    data: locations,
    isLoading: isLoadingLocations,
    error: locationsError,
  } = useQuery<Location[]>({
    queryKey: [`/api/locations/${stateCode}`],
    enabled: stateCode !== "",
    staleTime: Infinity,
  });

  const handleNextStep = () => {
    if (currentStep === 1 && businessTypeId) {
      setCurrentStep(2);
    } else if (currentStep === 2 && locationId) {
      setCurrentStep(3);
      setIsLoading(true);
      
      // Simulate loading then navigate to results page
      setTimeout(() => {
        setLocation(`/results?businessTypeId=${businessTypeId}&locationId=${locationId}`);
      }, 2000);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStateChange = (value: string) => {
    setStateCode(value);
    setLocationId(""); // Reset location when state changes
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Berkeley Business Compliance Discovery
        </h2>
        <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          Find all the compliance requirements for your business in Berkeley, California
        </p>

        <StepIndicator currentStep={currentStep} totalSteps={3} />

        {/* Step 1: Business Type */}
        {currentStep === 1 && (
          <Card className="max-w-lg mx-auto bg-gray-50 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">
              Select your business type
            </h3>
            <p className="text-gray-600 mb-6">
              Choose the category that best matches your business operations.
            </p>

            <div className="mb-4">
              <label htmlFor="business-type" className="block text-gray-700 mb-2">
                Business Type
              </label>
              {isLoadingBusinessTypes ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading business types...</span>
                </div>
              ) : businessTypesError ? (
                <div className="text-red-500">Failed to load business types</div>
              ) : (
                <Select
                  value={businessTypeId}
                  onValueChange={setBusinessTypeId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes?.map((type: BusinessType) => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <Button
              className="w-full"
              onClick={handleNextStep}
              disabled={!businessTypeId}
            >
              Next Step
            </Button>
          </Card>
        )}

        {/* Step 2: Location Selection */}
        {currentStep === 2 && (
          <Card className="max-w-lg mx-auto bg-gray-50 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">
              Where is your business located?
            </h3>
            <p className="text-gray-600 mb-6">
              Compliance requirements vary by location.
            </p>

            <div className="mb-4">
              <label htmlFor="state" className="block text-gray-700 mb-2">
                State
              </label>
              <Select value={stateCode} onValueChange={handleStateChange} defaultValue="ca">
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ca">California</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {stateCode && (
              <div className="mb-4">
                <label htmlFor="city" className="block text-gray-700 mb-2">
                  City
                </label>
                {isLoadingLocations ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading cities...</span>
                  </div>
                ) : locationsError ? (
                  <div className="text-red-500">Failed to load cities</div>
                ) : (
                  <Select value={locationId} onValueChange={setLocationId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations?.map((location: Location) => (
                        <SelectItem key={location.id} value={location.id.toString()}>
                          {location.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}

            <div className="flex space-x-4">
              <Button
                className="w-1/2"
                variant="outline"
                onClick={handlePreviousStep}
              >
                Back
              </Button>
              <Button
                className="w-1/2"
                onClick={handleNextStep}
                disabled={!locationId}
              >
                Find Requirements
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Loading State */}
        {currentStep === 3 && (
          <div className="max-w-lg mx-auto text-center py-10">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">
              Analyzing compliance requirements for your business...
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Discovery;
