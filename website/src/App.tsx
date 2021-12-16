import { Button, Calendar, ScrollArea, Stack } from '@agile-ui/react';
import { useTimeout } from '@agile-ui/react-hooks';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export const App = () => {
  useTimeout(() => {
    document.getElementById('splash')?.remove();
  }, 500);

  const btnRef = useRef(null);

  useEffect(() => {
    console.log(btnRef.current);
  }, [btnRef]);

  return (
    <>
      <Stack as={'span'} direction={'row'} style={{ padding: '20px' }}>
        <Button to={''} as={Link} ref={btnRef} level={'primary'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'success'}>中文按钮</Button>
        &nbsp;&nbsp;
        <Button level={'natural'}>中文按钮</Button>
        &nbsp;&nbsp;
        <Button level={'warning'}>中文按钮</Button>
        &nbsp;&nbsp;
        <Button level={'danger'}>中文按钮</Button>
        &nbsp;&nbsp;
        <Button disabled>禁用按钮</Button>
      </Stack>
      <div style={{ padding: '20px' }}>
        <Button level={'primary'} variant={'outline'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'success'} variant={'outline'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'natural'} variant={'outline'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'warning'} variant={'outline'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'danger'} variant={'outline'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button variant={'outline'} disabled>
          禁用按钮
        </Button>
      </div>
      <div style={{ padding: '20px' }}>
        <Button level={'primary'} variant={'ghost'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'success'} variant={'ghost'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'natural'} variant={'ghost'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'warning'} variant={'ghost'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'danger'} variant={'ghost'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button variant={'ghost'} disabled>
          禁用按钮
        </Button>
      </div>
      <div style={{ padding: '20px' }}>
        <Button level={'primary'} variant={'link'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'success'} variant={'link'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'natural'} variant={'link'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'warning'} variant={'link'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'danger'} variant={'link'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button variant={'link'} disabled>
          禁用按钮
        </Button>
      </div>
      <div>
        <Calendar>1</Calendar>
      </div>
      <div style={{ padding: '20px' }}>
        <ScrollArea offsetScrollbars={true} type={'always'} style={{ height: '200px' }}>
          <p>
            Charizard (Pokémon) Charizard description from Bulbapedia Charizard is a draconic, bipedal Pokémon. It is
            primarily orange with a cream underside from the chest to the tip of its tail. It has a long neck, small
            blue eyes, slightly raised nostrils, and two horn-like structures protruding from the back of its
            rectangular head. There are two fangs visible in the upper jaw when its mouth is closed. Two large wings
            with blue-green undersides sprout from its back, and a horn-like appendage juts out from the top of the
            third joint of each wing. A single wing-finger is visible through the center of each wing membrane.
            Charizard&apos;s arms are short and skinny compared to its robust belly, and each limb has three white
            claws. It has stocky legs with cream-colored soles on each of its plantigrade feet. The tip of its long,
            tapering tail burns with a sizable flame. As Mega Charizard X, its body and legs are more physically fit,
            though its arms remain thin. Its skin turns black with a sky-blue underside and soles. Two spikes with blue
            tips curve upward from the front and back of each shoulder, while the tips of its horns sharpen, turn blue,
            and curve slightly upward. Its brow and claws are larger, and its eyes are now red. It has two small,
            fin-like spikes under each horn and two more down its lower neck. The finger disappears from the wing
            membrane, and the lower edges are divided into large, rounded points. The third joint of each wing-arm is
            adorned with a claw-like spike. Mega Charizard X breathes blue flames out the sides of its mouth, and the
            flame on its tail now burns blue. It is said that its new power turns it black and creates more intense
            flames.
          </p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
          <p>12</p>
          <p>12</p>
          <p>12</p>
          <p>12</p>
          <p>12</p>
          <p>12</p>
          <p>12</p>
        </ScrollArea>
      </div>
    </>
  );
};
