
export enum CommandCategory {
  RECON = 'Reconnaissance',
  CAPTURE = 'Handshake Capture',
  CRACK = 'Cracking',
  WPS = 'WPS Attacks',
  POST = 'Post-Exploitation',
  UTILS = 'Utilities'
}

export interface WiFiCommand {
  id: string;
  name: string;
  description: string;
  syntax: string;
  category: CommandCategory;
  tool: string;
  dangerLevel: 'Low' | 'Medium' | 'High';
}

export interface ScenarioStep {
  title: string;
  command: string;
  explanation: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  steps: ScenarioStep[];
}
