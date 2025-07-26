import { Button } from './ui/button';
import {
  ArrowBigLeft,
  CircleQuestionMark,
  Home,
  MoonStarIcon,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const Header = () => {
  return (
    <header className="sticky top-0">
      <div className="w-full flex justify-between p-4 relative">
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={'icon'} variant={'ghost'}>
                <ArrowBigLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Back</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={'icon'} variant={'default'}>
                <Home />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Home</TooltipContent>
          </Tooltip>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h2 className="scroll-m-20  pb-2 text-lg lg:text-3xl font-semibold tracking-tight first:mt-0">
            Control Room Worksheet
          </h2>
        </div>
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={'secondary'} size="icon">
                <CircleQuestionMark />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Help</TooltipContent>
          </Tooltip>
          <Button variant={'ghost'} size={'icon'}>
            <MoonStarIcon />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
