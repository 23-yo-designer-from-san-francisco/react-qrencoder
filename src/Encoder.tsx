import {
  AdaptivityProvider,
  Div,
  Group,
  Panel, PanelHeader,
  SizeType,
  Textarea,
  View
} from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

import './Encoder.css';

export const Encoder: React.FC = () => {
  const [data, setData] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const encode = async () => {
    if (data === '') {
      return setCode('');
    }
    try {
      const code = await QRCode.toString(data, { width: 500, type: 'svg' });
      setCode(code);
    } catch (e) {
      console.error(e);
    }
  };
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.currentTarget.value);
  };

  useEffect(() => {
    encode();
  }, [data]);

  return (
    <View activePanel="encoder">
      <Panel id="encoder">
        <PanelHeader>QR Encoder</PanelHeader>
        <AdaptivityProvider sizeY={SizeType.COMPACT}>
          <Div className="qrcode" dangerouslySetInnerHTML={{ __html: code }} />
          <Group>
            <Textarea
              value={data}
              onChange={changeHandler}
            />
          </Group>
        </AdaptivityProvider>
      </Panel>
    </View>
  );
};
