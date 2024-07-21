export interface Buttonconfig {
  label: string;
  styles: { [key: string]: string };
  clickHandler?: () => void;
}
