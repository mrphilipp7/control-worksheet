function createDice() {
  function rollDice(min: number, max: number) {
    min = Math.ceil(min); // Ensure min is an integer
    max = Math.floor(max); // Ensure max is an integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // export all possible dice roles
  function roll4() {
    return rollDice(1, 4);
  }

  function roll6() {
    return rollDice(1, 6);
  }

  function roll8() {
    return rollDice(1, 8);
  }

  function roll10() {
    return rollDice(1, 10);
  }

  function roll12() {
    return rollDice(1, 12);
  }

  function roll20() {
    return rollDice(1, 20);
  }

  function rollByDiceType(type: 4 | 6 | 8 | 10 | 12) {
    switch (type) {
      case 4:
        return roll4();
      case 6:
        return roll6();
      case 8:
        return roll8();
      case 10:
        return roll10();
      case 12:
        return roll12();
      default:
        throw new Error('unknown dice value added');
    }
  }

  type Modifier = {
    name: string;
    value: number;
  };

  type RollDamageCheckProps = {
    diceQuantity: number;
    diceType: 4 | 6 | 8 | 10 | 12;
    modifiers?: Modifier[];
  };

  function rollDamageCheck({
    diceQuantity,
    diceType,
    modifiers,
  }: RollDamageCheckProps) {
    // take array of modifiers and add them all up
    let modifiersSum = 0;
    if (modifiers) {
      modifiersSum = modifiers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.value;
      }, 0);
    }

    let diceRoleSum = 0;
    for (let i = 0; i < diceQuantity; i++) {
      diceRoleSum = diceRoleSum + rollByDiceType(diceType);
    }

    return { outcome: modifiersSum + diceRoleSum, modifiersSum };
  }

  function rollAttackCheck({
    statusEffect,
    modifiers,
  }: {
    statusEffect: 'none' | 'advantage' | 'disadvantage';
    modifiers: Modifier[];
  }) {
    // take array of modifiers and add them all up
    let modifiersSum = 0;
    if (modifiers) {
      modifiersSum = modifiers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.value;
      }, 0);
    }

    const firstRoll = roll20();
    const secondRoll = roll20();
    let chosenRoll;
    switch (statusEffect) {
      case 'none':
        chosenRoll = firstRoll;
        break;
      case 'advantage':
        chosenRoll = firstRoll > secondRoll ? firstRoll : secondRoll;
        break;
      case 'disadvantage':
        chosenRoll = firstRoll > secondRoll ? secondRoll : firstRoll;
        break;
    }

    let naturalRoll = null;
    if (chosenRoll === 20) naturalRoll = 20;
    if (chosenRoll === 1) naturalRoll = 1;

    return {
      outcome: chosenRoll + modifiersSum,
      firstRoll,
      secondRoll,
      statusEffect,
      naturalRoll,
      modifiersSum,
    };
  }

  return {
    roll4,
    roll6,
    roll8,
    roll10,
    roll12,
    rollDamageCheck,
    rollAttackCheck,
  };
}

export const dice = createDice();
