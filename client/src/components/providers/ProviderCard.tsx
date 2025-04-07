import { ServiceProvider } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ProviderCardProps {
  provider: ServiceProvider & { categoryName?: string };
  isListItem?: boolean;
}

const ProviderCard = ({ provider, isListItem = false }: ProviderCardProps) => {
  const { name, description, locationText, rating, reviewCount, price, certification, categoryName } = provider;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Determine badge color based on category
  const getBadgeColor = (category: string | undefined) => {
    switch(category) {
      case 'Health & Safety':
        return "bg-blue-100 text-blue-800";
      case 'Fire Safety':
        return "bg-red-100 text-red-800";
      case 'Licensing':
        return "bg-green-100 text-green-800";
      case 'Employment':
        return "bg-yellow-100 text-yellow-800";
      case 'Environmental':
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleContactClick = () => {
    setIsDialogOpen(true);
  };

  const handleSendMessage = () => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${name}. They will contact you shortly.`,
    });
    setIsDialogOpen(false);
  };

  if (isListItem) {
    return (
      <div className="provider-card bg-white border rounded-md p-4 hover:shadow-md transition">
        <div className="flex justify-between items-start">
          <div>
            <h6 className="font-bold">{name}</h6>
            <Rating rating={rating} reviewCount={reviewCount} showCount={false} />
          </div>
          <span className="text-green-600 font-medium">{price}</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500">{locationText}</span>
          <Button variant="link" className="text-primary p-0" onClick={handleContactClick}>Contact</Button>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Contact {name}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="text-sm">{locationText}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="text-sm">(510) 555-0123</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="text-sm">contact@{name.toLowerCase().replace(/\s+/g, '')}.com</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs text-gray-500 mb-2">Send a message:</p>
                  <textarea
                    className="w-full p-2 border rounded-md text-sm"
                    rows={4}
                    placeholder="Let us know how we can help with your compliance needs..."
                  ></textarea>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSendMessage}>Send Message</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <Card className="provider-card bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-bold text-lg">{name}</h4>
          {categoryName && (
            <Badge className={getBadgeColor(categoryName)} variant="outline">
              {categoryName}
            </Badge>
          )}
        </div>
        
        <div className="mb-2">
          <Rating rating={rating} reviewCount={reviewCount} />
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        
        <div className="flex justify-between text-sm mb-4">
          <span className="text-gray-500">{locationText}</span>
          <span className="font-medium text-green-600">Starting at {price}</span>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
          <span>{certification}</span>
        </div>
        
        <Button className="w-full" onClick={handleContactClick}>Contact Provider</Button>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact {name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <p className="text-sm">{locationText}</p>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <p className="text-sm">(510) 555-0123</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <p className="text-sm">contact@{name.toLowerCase().replace(/\s+/g, '')}.com</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-xs text-gray-500 mb-2">Send a message:</p>
                <textarea
                  className="w-full p-2 border rounded-md text-sm"
                  rows={4}
                  placeholder="Let us know how we can help with your compliance needs..."
                ></textarea>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSendMessage}>Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProviderCard;
