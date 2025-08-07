import { Button } from '../ui/button';
import { dice } from '@/lib/dice';
import { useRollStore } from '@/store/rolls';

type Attack = {
  name: string;
  type: string;
  damageType: string;
  range: number;
  damageDiceType: 4 | 6 | 8 | 10 | 12;
  diceQuantity: number;
};
const attacks: Attack[] = [
  {
    name: 'greataxe',
    type: 'melee',
    damageType: 'slashing',
    range: 5,
    damageDiceType: 12,
    diceQuantity: 1,
  },
  {
    name: 'spear',
    type: 'melee',
    damageType: 'piercing',
    range: 5,
    damageDiceType: 8,
    diceQuantity: 1,
  },
];

const stats = [
  {
    name: 'strength',
    value: 3,
  },
];

const AttackTable = () => {
  const { rolls, setRolls } = useRollStore();

  return (
    <table className="w-96 space-y-4">
      <tr className="flex justify-between pb-4   p-2">
        <th>Attack Name</th>
        <th>Range</th>
        <th>Damage</th>
      </tr>
      {attacks.map((attack) => (
        <tr className="flex gap-4 justify-between border-2 border-black/50 hover:border-black hover:ease-in-out hover:duration-300 rounded-md p-2 items-center">
          <td className=" w-32">
            <p className="text-sm">{attack.name}</p>
            <p className="text-sm text-muted-foreground">{attack.type}</p>
          </td>
          <td className=" w-12">
            <p>{attack.range}ft</p>
          </td>
          <td className=" w-18 ">
            <Button
              onClick={() => {
                const outcome = dice.rollAttackCheck({
                  statusEffect: 'disadvantage',
                  modifiers: [
                    {
                      name: 'strength',
                      value: 3,
                    },
                  ],
                });
                console.log(outcome);
                setRolls([
                  ...rolls,
                  {
                    rollOutcome: outcome.outcome,
                    modifierBonus: outcome.modifiersSum,
                    weapon: attack.name,
                    naturalRole: outcome.naturalRoll,
                  },
                ]);
              }}
              className="w-full"
            >
              {attack.diceQuantity}d{attack.damageDiceType}+{stats[0].value}
            </Button>
          </td>
        </tr>
      ))}
    </table>
  );
};

export default AttackTable;
