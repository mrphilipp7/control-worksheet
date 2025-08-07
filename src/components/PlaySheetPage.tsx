import Main from './Main';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import AttackTable from './PlayerSheet/AttackTable';
import { useRollStore } from '@/store/rolls';

const stats = [
  {
    name: 'strength',
    value: 3,
  },
];

const showOutcomeColor = (outcome: number | null) => {
  if (outcome === null) return;
  if (outcome === 1) {
    return 'border-destructive text-destructive';
  } else if (outcome === 20) {
    return 'border-green-500 text-green-500';
  } else {
    return '';
  }
};

const PlayerSheetPage = () => {
  const { rolls } = useRollStore();

  return (
    <Main className="gap-4">
      <Card className="w-fit">
        <CardContent>
          {stats.map((stat) => (
            <>
              <p>
                {stat.name}: {stat.value}
              </p>
            </>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Combat</CardTitle>
          <CardDescription>view your weapons and their stats</CardDescription>
        </CardHeader>
        <CardContent>
          <AttackTable />
        </CardContent>
      </Card>
      <section className="flex flex-col space-y-4">
        {rolls.map((roll) => (
          <>
            <Card className="flex flex-row space-x-4">
              <CardHeader>
                <div>
                  <CardTitle>{roll.weapon}</CardTitle>
                  <CardDescription>1d20+{roll.modifierBonus}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 rounded p-2 w-12 h-12 flex justify-center items-center ${showOutcomeColor(
                    roll.naturalRole
                  )}`}
                >
                  <p>{roll.rollOutcome}</p>
                </div>
              </CardContent>
            </Card>
          </>
        ))}
      </section>
    </Main>
  );
};

export default PlayerSheetPage;
