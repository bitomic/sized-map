export class SizedMap<K, V> extends Map<K, V> {
	#maxSize: number

	public constructor( maxSize: number ) {
		super()
		this.#maxSize = maxSize
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
		super.clear()
	}

	public override delete( key: K ): boolean {
		return super.delete( key )
	}

	protected pop( n = 1 ): void {
		if ( n <= 0 || !Number.isInteger( n ) ) throw RangeError( 'You must provide a positive integer' )

		let idx = 0
		for ( const key of this.keys() ) {
			this.delete( key )
			if ( ++idx >= n ) break
		}
	}

	public override set( key: K, value: V ): this {
		if ( !this.has( key ) && this.size >= this.#maxSize ) {
			this.pop( 1 )
		}

		return super.set( key, value )
	}
}

export default SizedMap
