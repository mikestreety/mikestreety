if(globalThis.fetch){
	let t = 'https://unrot.link'; fetch(t + '/ping', {method: 'HEAD', mode: 'cors'}).then(e=>{
		204 === e.status ? document.body.addEventListener('click', e=>{
			let s = e.target.closest('a[href]'); if(s){
				let i = s.attributes.href.value; if(!i.startsWith('http') || i.includes('archive.org'))return; i = encodeURIComponent(i), s.href = t + `/?url=${i}`; let r = s.closest('.h-entry'); if(r){
					let l = r.querySelector('.dt-published[datetime]'); l && (s.href += `&date=${l.dateTime}`);
				}
			}
		}, {passive: !0}) : 402 === e.status ? console.log('unrot.link does not have your site in the allow list. Please visit https://unrot.link/access/ to request access (it\'s free).') : console.log('unrot.link is not responding correctly - possibly remove this script');
	}).catch(t=>{
		console.log('unrot.link is unreachable - possibly remove this script');
	});
}