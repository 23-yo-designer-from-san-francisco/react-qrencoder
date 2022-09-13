import { Button, Div, Group, Header, Panel, SegmentedControl, SegmentedControlValue, Textarea, View } from '@vkontakte/vkui';
import React, { useState } from 'react';
import QRCode from 'qrcode';

import './Encoder.css';
import { Icon24CheckCircleOn, Icon24DismissSubstract } from '@vkontakte/icons';

export const Encoder: React.FC = () => {
  const [data, setData] = useState<string>('');
  const [enableEnter, setEnableEnter] = useState<SegmentedControlValue>(1);
  const [code, setCode] = useState<string>('');

  const encode = async () => {
    try {
      const code = await QRCode.toString(data, { width: 500, type: 'svg' });
      setCode(code);
    } catch (e) {
      console.error(e);
    }
  };
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    if (enableEnter && value.slice(-1) === '\n') {
      return;
    }
    setData(e.currentTarget.value);
  };
  const enterHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      encode();
    }
  };
  const enterControlOptions = [
    {
      label: <Icon24DismissSubstract/>,
      value: 0,
      'aria-label': 'Выключено'
    },
    {
      label: <Icon24CheckCircleOn/>,
      value: 1,
      'aria-label': 'Включено'
    }
  ];

  return (
    <View activePanel="encoder">
      <Panel id="encoder">
        <Div className="qrcode" dangerouslySetInnerHTML={{ __html: code }} />
        <Group>
          <Textarea
            value={data}
            onChange={changeHandler}
            onKeyDown={enterHandler}
          />
          <Group header={
            <Header
              subtitle="Отключение позволит использовать Enter в поле ввода текста"
            >
              Генерация по Enter
            </Header>
          }>
            <SegmentedControl
              size="m"
              value={enableEnter}
              onChange={setEnableEnter}
              options={enterControlOptions} />
          </Group>
          <Button onClick={encode}>Encode</Button>
        </Group>
      </Panel>
    </View>
  );
};
