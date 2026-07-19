import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('ielts-completa-v2.html', 'r', encoding='utf-8') as f:
    c = f.read()

audio_ids = ['audio-n1-1', 'audio-n1-2', 'audio-n2-1', 'audio-n2-2', 'audio-n3-1']

for aid in audio_ids:
    # Find the hidden div with data-text
    marker = f'id="{aid}" data-text'
    pos = c.find(marker)
    if pos < 0:
        print(f'{aid}: NOT FOUND')
        continue
    
    # Check if there's already a progress bar before this div
    search_start = max(0, pos - 600)
    end_div = c.find('</div>', pos) + 6
    block = c[search_start:end_div]
    has_progress = 'audio-progress-fill' in block
    has_time = 'audio-time' in block
    
    if has_progress and has_time:
        print(f'{aid}: already has progress + time')
        continue
    
    # Find the end of the closing </div> of this hidden div
    # The structure is: <div id="audio-nX-X" data-text="..." data-rate="..." style="display:none"></div>
    # We need to add progress bar and time AFTER this closing div
    close_tag_end = c.find('</div>', pos) + 6
    
    # Build the new elements to insert
    new_elements = '\n<div class="audio-progress"><div class="audio-progress-fill"></div></div>\n<div class="audio-info-row"><span class="audio-status">🔊 Listo para reproducir</span><span class="audio-time"></span></div>\n'
    
    # Insert after the closing div of the hidden data element
    c = c[:close_tag_end] + new_elements + c[close_tag_end:]
    print(f'{aid}: added progress bar + time')

with open('ielts-completa-v2.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Done! All audio players updated.')
