import {TopBundle} from "./TopBundle";
import {Bundle} from "./Bundle";
import {ModViewer} from "./ModViewer";

export interface RunDetails {
  top: TopBundle;
  bundle: Bundle;
  modList: ModViewer[];
}
