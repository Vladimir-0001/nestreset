# NestReset

**Take back control of your Nest.**  
A local web utility that writes a `.dropbox` reset configuration file to a user-selected Nest storage volume. Reset behavior depends on the thermostat model and firmware; successful file writing does not prove that a reset or account removal succeeded.

---

## ✨ What is this?

**nestReset** is a local HTML-based tool that allows users to:

- Connect their Nest device via USB  
- Select the internal storage folder  
- Upload a `.dropbox` reset file  
- Regain full control of their Nest thermostat  

The implementation writes a configuration file; it does not flash firmware, detect USB devices, or mount storage. Google's USB troubleshooting documentation does not certify this project's reset file.

---

## 🔒 Why?

Some landlords, institutions, or admins remotely lock down Nest devices—blocking user control, restricting temperature modes, or changing settings without consent.

**[nestReset](https://vladimir-0001.github.io/nestreset/)** exists to restore control to the person who actually lives with the device.

---

## 🧰 Requirements

- A Nest thermostat whose model and firmware expose a writable USB storage volume and accept this reset configuration. This repository does not establish a verified model/firmware compatibility matrix.
- A USB **data** cable matching the thermostat's connector, plus a data-capable adapter if needed.
- Current desktop Chrome or Edge on Windows or macOS, with file access allowed. Other Chromium browsers must implement `window.showDirectoryPicker()`; Chromium branding alone is not a guarantee.
- A mounted, writable Nest volume and permission for the website to write to it.

---

## ⚙️ How to Use (Windows / general flow)

1. **Plug in** your Nest via USB  
2. **Open** `index.html` in your browser or go to the github [page](https://vladimir-0001.github.io/nestreset/)
3. **Select** the Nest folder in the file picker  
4. **Upload** Press the upload button to uplod the xml 
5. **Wait** for the file-write success message, safely eject the Nest volume if available, then unplug and reinstall the display. Check the thermostat itself to determine whether the reset succeeded.

Visual step-by-step diagrams are included directly on the page.

---


## macOS instructions and compatibility

**The browser API supports macOS; end-to-end NestReset hardware compatibility has not been physically verified in this review.** Safari and Firefox do not currently implement the required `showDirectoryPicker()` API. Use current desktop Chrome or Edge and the [HTTPS project page](https://vladimir-0001.github.io/nestreset/) directly in a browser tab. A missing API is a browser/context issue, not evidence that USB is broken.

### Check the thermostat and USB connection first

Google lists these connectors; this is a **connector reference, not a NestReset support list**:

| Thermostat | USB connector |
| --- | --- |
| Nest Learning Thermostat, 1st generation | Mini-USB |
| Nest Learning Thermostat, 2nd or 3rd generation | Micro-USB |
| Nest Thermostat E | Micro-USB |
| Nest Learning Thermostat, 4th generation | USB-C |
| Nest Thermostat (AAA-battery model) | No USB port; this USB workflow cannot be used |

A USB port alone does not establish storage-mode or reset-file compatibility. For this workflow, the display must have enough power to operate, establish a USB data connection, expose storage, and have that storage mounted and writable by the computer.

1. Remove the thermostat display from its base and connect its rear USB port to the Mac with a known-good **data-capable** cable. Charging-only cables cannot carry the required data. Try a direct connection or a known-good data adapter instead of a hub.
2. If the battery is depleted, recharge it following [Google's USB instructions](https://support.google.com/googlehome/answer/9245516?hl=en), then retry the data connection. Charging does not prove USB data is working.
3. On Apple-silicon Mac laptops, unlock the Mac and approve **Allow** if an accessory prompt appears. If previously denied, reconnect and approve it. Check **System Settings > Privacy & Security > Accessories / Allow accessories to connect** (wording varies by macOS version).
4. Look in **Finder > Locations** for the Nest volume. If external disks are hidden, enable them in Finder Settings (Preferences on older macOS), under Sidebar / General. Confirm you can open the actual volume, rather than a folder created on your Mac.
5. Once the volume is accessible, open the HTTPS project page in Chrome or Edge. Click **Select Device Folder**, select the **top level of the Nest volume**, and grant access. Click **Upload Reset File** and approve any write permission prompt.
6. Wait for the file-write success message before disconnecting. Eject the volume if available, reinstall the display, and verify the result on the thermostat.

The code writes `.dropbox` to whichever directory you select; it does not validate that the folder belongs to a Nest. A success message only confirms that the file write completed. Dot-prefixed files are normally hidden in Finder.

### Troubleshoot by failure stage

| What you see | What to check next |
| --- | --- |
| “File System Access API not supported” or no folder picker | Use current desktop Chrome/Edge and the HTTPS page in its own tab. Safari/Firefox cannot run this picker workflow. |
| No Nest volume in Finder | Open **System Information** (hold Option while opening the Apple menu), then **Hardware > USB**. If absent, retry cable, port, adapter, accessory approval, power, and another computer. Refresh/reopen System Information after reconnecting. |
| USB device listed, but no accessible disk | Open **Disk Utility > View > Show All Devices**. USB enumeration is not the same as a mounted storage volume. If an existing Nest volume is unmounted, select it and try **Mount**. If no storage volume is exposed or mounting fails, browser changes cannot fix that stage. |
| Volume opens in Finder but selection or writing fails | Reselect the actual Nest volume and allow browser write access. Check macOS **Privacy & Security > Files and Folders** for the browser's removable-volume permission if offered. A read-only volume, device disconnect, or managed-computer policy can also prevent writes. |
| File write succeeds, but no reset occurs | Browser/file access worked; reset-file acceptance by this model/firmware remains unverified. Contact Google Nest support rather than treating file success as proof of an unlock. |

**Do not erase, initialize, partition, or reformat the thermostat** if the computer offers to do so. If storage remains unavailable, restart the computer and thermostat using Google's model-specific restart instructions, retry a known-good cable/computer, and contact [Google Nest support](https://support.google.com/googlenest/gethelp). A work PC may restrict removable storage or browser file access; ask its administrator or use a permitted personal computer.

On **Windows**, keep using the general steps above: first confirm that the Nest volume opens in **File Explorer > This PC**, then select its top-level folder in Chrome/Edge. If absent, check **Device Manager** for USB detection and **Disk Management** for an existing volume; do not initialize or format it. The same cable, power, model/firmware, and work-computer restrictions apply.

### Technical references

- [Google: Nest thermostat USB port and connector types](https://support.google.com/googlehome/answer/9245516?hl=en) — charging/troubleshooting documentation, not certification of this reset method.
- [Chrome: File System Access API](https://developer.chrome.com/docs/capabilities/web-apis/file-system-access/) — desktop macOS support, secure contexts, and write permissions.
- [MDN browser compatibility data for Window APIs](https://github.com/mdn/browser-compat-data/blob/main/api/Window.json) — see `showDirectoryPicker` for browser support.
- [Apple: Allow USB accessories](https://support.apple.com/en-us/102282).
- [Apple: Check device connections and System Information](https://support.apple.com/guide/mac-help/mchlf779ae93/mac).
- [Apple: Show all devices in Disk Utility](https://support.apple.com/guide/disk-utility/view-all-devices-or-only-volumes-dskud6b39edb/mac) and [mount an existing volume](https://support.apple.com/guide/disk-utility/dskutl1027/mac).

The page's “Working as of” timestamp is generated from the current clock by `script.js`; it is not a hardware test record.

---

## 🧠 Philosophy

This project is about **user autonomy**.  
If you live with the hardware, **you should control it**.  
No remote admin should have permanent control over your thermostat.

---

## 📎 Disclaimer

This is an **educational tool** provided as-is.  
You are solely responsible for how you use it.  
This project is not affiliated with Google or Nest Labs in any way.

---

## 🔗 License

MIT — do what you want, just don't be evil.
