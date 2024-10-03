// this is a file for the app's custom types, distinct from next-env.d.ts, per nextJS docs

// for selecting a single polygon from the front page map dropwdowns
// separate dropdown for each polygon type, eg. territories, languages, treaties
interface PolygonDropdownOption {
  value: number;
  label: string;
}
