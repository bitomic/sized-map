export class SizedMap<K, V> extends Map<K, V> {
	#maxSize: number
	#orderedKeys: K[]

	public constructor( maxSize: number ) {
		super()
		this.#maxSize = maxSize
		this.#orderedKeys = []
	}

	public get maxSize(): number {
		return this.#maxSize
	}

	public set maxSize( newSize: number ) {
		if ( newSize === this.#maxSize ) return
		if ( newSize > this.#maxSize ) {
			this.#maxSize = newSize
			return
		}
		this.pop( this.#maxSize - newSize )
		this.#maxSize = newSize
	}

	public override clear(): void {
		this.#orderedKeys.splice( 0, this.#orderedKeys.length )
		super.clear()
	}

	public override delete( key: K ): boolean {
		this.#orderedKeys = this.#orderedKeys.filter( k => k !== key )
		return super.delete( key )
	}

	protected pop( n = 1 ): void {
		if ( n <= 0 || !Number.isInteger( n ) ) throw RangeError( 'You must provide a positive integer' )
		if ( n === 1 ) {
			const key = this.#orderedKeys.shift()
			if ( key ) this.delete( key )
			return
		}
		const keys = this.#orderedKeys.splice( 0, n )
		for ( const key of keys ) super.delete( key )
	}

	protected push( key: K ): void {
		if ( this.#orderedKeys.length === this.#maxSize ) this.pop()
		this.#orderedKeys.push( key )
	}

	public override set( key: K, value: V ): this {
		this.push( key )
		return super.set( key, value )
	}
}

export default SizedMap
