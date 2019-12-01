import ddf.minim.*;
import ddf.minim.signals.*;

 
Minim minim;
AudioOutput out;
Oscillator sound;
float C3, C3B, D3, D3B, E3, F3, F3B, G3, G3B, A3, A3B, B3, C4, C4B, D4,D4B, E4, F4, F4B, G4, G4B, A4, A4B, B4, C5, C5B, D5, D5B, E5, F5, F5B, G5, G5B, A5, A5B, B5;
char currentNote;

void setup()
{
  size(700,600);
  
    C3 = 130.81;
    C3B =  130.59;
    D3 = 146.83;
    D3B = 155.56 ;
    E3 = 164.81;
    F3 = 174.61;
    F3B = 185.00 ;
    G3 = 196.00;
    G3B = 207.65;
    A3 = 220.00;
    A3B =233.08;
    B3 = 246.94;
    C4 = 261.63;      //Middle C
    C4B =277.18 ;
    D4 = 293.67;
    D4B = 311.13;
    E4 = 329.63;
    F4 = 349.23;
    F4B =369.99 ;   
    G4 = 392.00;
    G4B =415.30;
    A4 = 440.0;
    A4B = 466.16;
    B4 = 493.88;
    C5 = 523.25;
    C5B = 554.37;
    D5 = 587.33;
    D5B = 622.25;
    E5 = 659.26;
    F5 = 698.46;
    F5B = 739.99;
    G5 = 783.99;
    G5B =830.61;
    A5 = 880.00;
    A5B = 932.33;
    B5 = 987.77;
    
    frameRate(120);
    textSize(32);
    fill(0);
    currentNote = ' ';
    minim = new Minim(this); 
    out = minim.getLineOut();
 
    sound = new SineWave(0,0.1, out.sampleRate());
 
    out.addSignal(sound);
}

void draw() 
{
  int keyWidth= 0;
  int keyWidth1= 0;
  int keyWidth2= 0;
  int keyWidth3= 0;
  int whiteWidth= width/21;
  float blackHeight= height*2/5;
  float blackWidth= whiteWidth/2+whiteWidth/4;
  int blackHover= -1;

for (int i=0; i<21; i++)
{
    float keyHeight= whiteWidth*(i+1)- blackWidth/2;
    if(key> keyHeight && key <= keyHeight*blackWidth && 
    key <= blackHeight && i !=2)
    {
    blackHover = i;
    }
}
for( int whiteKey=0; whiteKey < 21; whiteKey++)
{
    stroke(1);
    strokeWeight(3);
    int keyHeight = whiteKey * whiteWidth;
    if(key> keyHeight && key <=keyHeight+ whiteWidth && blackHover == -1)
    {
      fill(150,255,255);
    } else if(key> keyHeight && key <=keyHeight+ whiteWidth && key<=keyHeight && keyPressed&&blackHover == whiteKey)
    {
      fill(255,0,0);
    }
    else
    {
      fill(255);
    }
    rect(keyHeight, keyWidth, whiteWidth, height);
  }

for(int blackKey=0; blackKey<17; blackKey++)
{
    float keyHeight= whiteWidth*(blackKey+1)- blackWidth/2;
    if(blackKey==2)
    {
      keyHeight= whiteWidth*(blackKey+3)-blackWidth/2+whiteWidth;
    }
    fill(0);
    blackHover= blackKey;
    noStroke();
    
    float keyHeight1= whiteWidth*(blackKey+3)- blackWidth/4;
    if(blackKey==6)
    {
      keyHeight= whiteWidth*(blackKey+3)-blackWidth/2+whiteWidth;
    }
    fill(0);
    blackHover= blackKey;
    noStroke();
    
    float keyHeight2= whiteWidth*(blackKey+4)- blackWidth/2;
    if(blackKey==9)
    {
      keyHeight= whiteWidth*(blackKey+8)-blackWidth/2+whiteWidth;
    }
    fill(0);
    blackHover= blackKey;
    noStroke();
    
    float keyHeight3= whiteWidth*(blackKey+3)- blackWidth/1;
    if(blackKey==16)
    {
      keyHeight= whiteWidth*(blackKey+3)-blackWidth/2+whiteWidth;
    }
    fill(0);
    blackHover= blackKey;
    noStroke();
    
    fill(0);
    blackHover= blackKey;
    noStroke();
    if(key> keyHeight&&key<=keyHeight+blackWidth && key<= blackHeight && keyPressed &&blackHover== blackKey)
    {
      stroke(2);
      fill(0,255,255);
    }
    else if(key>keyHeight&& key<=keyHeight+ blackWidth && key<=keyHeight && blackHover == blackKey)
    {
      stroke(2);
      fill(50,255,50);
    }
    else
    {
      fill(0);
    }
    rect(keyHeight, keyWidth, blackWidth, blackHeight);
}
}

void keyPressed()
{
    if (key != CODED)              //change display
      currentNote = key;           //only if necessary
    if (key == 'q')
      sound.setFreq(C3);
    if (key == 'w')
      sound.setFreq(D3);
    if (key == 'e')
      sound.setFreq(E3);
    if (key == 'r')
      sound.setFreq(F3);
    if (key == 't')
      sound.setFreq(G3);
    if (key == 'y')
      sound.setFreq(A3);
    if (key == 'u')
      sound.setFreq(B3);
    if (key == 'a')
      sound.setFreq(C4);
    if (key == 's')
      sound.setFreq(D4);
    if (key == 'd')
      sound.setFreq(E4);
    if (key == 'f')
      sound.setFreq(F4);
    if (key == 'g')
      sound.setFreq(G4);
    if (key == 'h')
      sound.setFreq(A4);
    if (key == 'j')
      sound.setFreq(B4);
    if (key == 'k')
      sound.setFreq(C5);
    if (key == 'l')
      sound.setFreq(D5);
    if (key == ';')
      sound.setFreq(E5);
    if (key == 'v')
      sound.setFreq(F5);
    if (key == 'b')
      sound.setFreq(G5);
    if (key == 'n')
      sound.setFreq(A5);
    if (key == 'm')
      sound.setFreq(B5);
}

void keyReleased()
{
    if (key == currentNote)
    {
      currentNote = ' ';
      sound.setFreq(0);
    }
}
 
void stop()
{
    out.close();
    minim.stop(); 
    super.stop();
}
