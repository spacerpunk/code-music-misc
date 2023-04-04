{
	var addr = NetAddr.new("127.0.0.1", 2020);
	OSCFunc({
		arg msg, time;
		var latency = time - Main.elapsedTime;
		addr.sendBundle(latency, msg)
	}, 'dirt/play').fix;
}
