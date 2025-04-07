import { useState } from "react";
import { ComplianceRequirement, ServiceProvider } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import ProviderCard from "@/components/providers/ProviderCard";

interface RequirementCardProps {
  requirement: ComplianceRequirement & { providers?: ServiceProvider[] };
}

const RequirementCard = ({ requirement }: RequirementCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const { title, description, urgency, timeframe, providers = [] } = requirement;

  return (
    <Card className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold text-lg mb-1">{title}</h4>
            <p className="text-gray-600 mb-3">{description}</p>
            <div className="flex items-center">
              <Badge variant="outline" className="bg-red-100 text-red-800">
                {urgency}
              </Badge>
              <span className="ml-3 text-sm text-gray-500">{timeframe}</span>
            </div>
          </div>
          <Button
            variant="link"
            className="text-primary hover:text-blue-700 text-sm font-medium flex items-center"
            onClick={() => setShowDetails(!showDetails)}
          >
            <span>{showDetails ? "Hide Details" : "View Details"}</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      
      {showDetails && (
        <div className="bg-gray-50 p-5 border-t">
          <h5 className="font-medium mb-3">Recommended Service Providers</h5>
          
          {providers.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {providers.map((provider) => (
                <ProviderCard 
                  key={provider.id} 
                  provider={provider} 
                  isListItem={true} 
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No service providers found for this requirement.</p>
          )}
        </div>
      )}
    </Card>
  );
};

export default RequirementCard;
